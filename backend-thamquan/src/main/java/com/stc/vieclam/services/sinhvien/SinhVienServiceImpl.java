package com.stc.vieclam.services.sinhvien;

import com.stc.vieclam.dtos.sinhvien.FilterSinhVienDto;
import com.stc.vieclam.dtos.sinhvien.PageSinhVienTransfer;
import com.stc.vieclam.dtos.sinhvien.SinhVienDto;
import com.stc.vieclam.entities.NganhDaoTao;
import com.stc.vieclam.entities.SinhVien;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.SinhVienRepository;
import com.stc.vieclam.services.email.EmailService;
import com.stc.vieclam.services.nganh.NganhService;
import com.stc.vieclam.utils.EnumRole;
import com.stc.vieclam.utils.PageUtils;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/12/21
 * Time      : 13:37
 * Filename  : SinhVienServiceImpl
 */
@Slf4j
@Service
public class SinhVienServiceImpl implements SinhVienService{
    private final SinhVienRepository sinhVienRepository;

    private final NganhService nganhService;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final MessageSource messageSource;

    private final EmailService emailService;

    private final MongoTemplate mongoTemplate;

    public SinhVienServiceImpl(SinhVienRepository sinhVienRepository,
                               NganhService nganhService,
                               VietnameseStringUtils vietnameseStringUtils, MessageSource messageSource, EmailService emailService, MongoTemplate mongoTemplate) {
        this.sinhVienRepository = sinhVienRepository;
        this.nganhService = nganhService;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.messageSource = messageSource;
        this.emailService = emailService;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Page<SinhVien> filter(FilterSinhVienDto dto, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);

        ProjectionOperation projectionOperation = Aggregation.project("maSV",
                "hoTen", "email", "ngaySinh", "queQuan",
                "gioiTinh", "dienThoai", "nganhDaoTao",
                "thoiGianTotNghiepDuKien", "trangThai")
                .and(ConvertOperators.ToObjectId.toObjectId("$nganhDaoTao.$id")).as("nganhId");

        Criteria criteria = new Criteria();
        List<Criteria> searchCriterias = new ArrayList<>();
        if (!ObjectUtils.isEmpty(dto.getSearch())) {
            searchCriterias.add(Criteria.where("maSV").regex(vietnameseStringUtils.makeSearchRegex(dto.getSearch()), "i"));
            searchCriterias.add(Criteria.where("hoTen").regex(vietnameseStringUtils.makeSearchRegex(dto.getSearch()), "i"));
            searchCriterias.add(Criteria.where("email").regex(vietnameseStringUtils.makeSearchRegex(dto.getSearch()), "i"));
            searchCriterias.add(Criteria.where("dienThoai").regex(vietnameseStringUtils.makeSearchRegex(dto.getSearch()), "i"));
        }

        LookupOperation lookupOperation = lookup(
                "nganh-dao-tao",
                "nganhId",
                "_id",
                "nganh"
        );

        if (!ObjectUtils.isEmpty(dto.getNganh())) {
            criteria.and("nganhDaoTao.$id").is(new ObjectId(dto.getNganh()));
        }

        if (!ObjectUtils.isEmpty(dto.getKhoa())) {
            criteria.and("nganh.khoa.$id").is(new ObjectId(dto.getKhoa()));
        }

        if (searchCriterias.size() > 0) {
            criteria.orOperator(searchCriterias.toArray(new Criteria[searchCriterias.size()]));
        }

        MatchOperation searchOperation = match(criteria);
        SkipOperation skipOperation = new SkipOperation((long) pageable.getPageNumber() * pageable.getPageSize());
        SortOperation sortOperation = sort(pageable.getSort())
                .and(Sort.Direction.ASC, "maSV");
        FacetOperation facetOperation = facet(
                count().as("total")).as("total")
                .and(skipOperation, limit(pageable.getPageSize())
                ).as("metaData");
        Aggregation aggregation = newAggregation(
                projectionOperation,
                lookupOperation,
                searchOperation,
                sortOperation,
                facetOperation
        );
        AggregationResults<PageSinhVienTransfer> aggregate = mongoTemplate.aggregate(aggregation,
                SinhVien.class,
                PageSinhVienTransfer.class);
        List<PageSinhVienTransfer> mappedResults = aggregate.getMappedResults();
        if (mappedResults.get(0).getTotal().size() == 0)
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        return new PageImpl<>(mappedResults.get(0).getMetaData(), pageable, mappedResults.get(0).getTotal().get(0).getTotal());
    }

    @Override
    public SinhVien getSinhVien(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return sinhVienRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format(messageSource.getMessage("error.sinhviennotfound",null, locale), id)));
    }

    @Override
    public SinhVien getCurrentSinhVien(Principal principal) {
        Locale locale = LocaleContextHolder.getLocale();
        return sinhVienRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NotFoundException(String.format(messageSource.getMessage("error.sinhviennotfound", null, locale), principal.getName())));
    }

    @Override
    public SinhVien getSinhVienByIdCore(String id){
        return sinhVienRepository.findByIdAndTrangThaiTrue(id).orElse(null);
    }

    @Override
    public SinhVien createSinhVien(SinhVienDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        if (ObjectUtils.isEmpty(dto.getMaSV())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienmasvempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getHoTen())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienhotenempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getEmail())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienemailempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getNgaySinh())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienngaysinhempty", null, locale));
        }

        if (ObjectUtils.isEmpty(dto.getQueQuan())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienquequanempty", null, locale));
        }

        if (ObjectUtils.isEmpty(dto.isGioiTinh())) {
            throw new InvalidException(messageSource.getMessage("error.sinhviengioitinhempty", null, locale));
        }

        if (ObjectUtils.isEmpty(dto.getDienThoai())) {
            throw new InvalidException(messageSource.getMessage("error.sinhviendienthoaiempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getThoiGianTotNghiepDuKien())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienthoigianempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getNganhDaoTao())) {
            throw new InvalidException(messageSource.getMessage("error.sinhviennganhempty", null, locale));
        }
        if (sinhVienRepository.existsByMaSVIgnoreCase(dto.getMaSV().trim())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.sinhvienexist", null, locale), dto.getMaSV()));
        }
        NganhDaoTao nganhDaoTao = nganhService.getNganhByIdCore(dto.getNganhDaoTao());
        if (nganhDaoTao == null) {
            throw new NotFoundException(String.format(messageSource.getMessage("error.nganhnotfound", null, locale), dto.getNganhDaoTao()));
        }
        SinhVien sinhVien = new SinhVien();
        sinhVien.setNganhDaoTao(nganhDaoTao);
        sinhVien.setMaSV(dto.getMaSV());
        sinhVien.setHoTen(dto.getHoTen());
        sinhVien.setEmail(dto.getEmail());
        sinhVien.setNgaySinh(dto.getNgaySinh());
        sinhVien.setQueQuan(dto.getQueQuan());
        sinhVien.setGioiTinh(dto.isGioiTinh());
        sinhVien.setDienThoai(dto.getDienThoai());
        sinhVien.setRoles(Collections.singletonList(EnumRole.ROLE_SINH_VIEN.name()));
        sinhVien.setThoiGianTotNghiepDuKien(dto.getThoiGianTotNghiepDuKien());
        sinhVienRepository.save(sinhVien);
        return sinhVien;
    }

    @Override
    public SinhVien createSinhVienCore(String hoTen, String email, String password) {
        String[] split = email.split("@student.hcmute.edu.vn");
        SinhVien sinhVien = new SinhVien();
        sinhVien.setEmail(email);
        sinhVien.setHoTen(hoTen);
        sinhVien.setMaSV(split[0]);
        sinhVien.setRoles(Collections.singletonList(EnumRole.ROLE_SINH_VIEN.name()));
        sinhVien.setTrangThai(true);
        sinhVien.setPassword(password);
        sinhVienRepository.save(sinhVien);
        return sinhVien;
    }

    @Override
    public SinhVien updateSinhVien(String id, SinhVienDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        SinhVien sinhVien = getSinhVien(id);
        if (ObjectUtils.isEmpty(dto.getMaSV())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienmasvempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getHoTen())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienhotenempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getEmail())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienemailempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getNgaySinh())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienngaysinhempty", null, locale));
        }

        if (ObjectUtils.isEmpty(dto.getQueQuan())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienquequanempty", null, locale));
        }

        if (ObjectUtils.isEmpty(dto.isGioiTinh())) {
            throw new InvalidException(messageSource.getMessage("error.sinhviengioitinhempty", null, locale));
        }

        if (ObjectUtils.isEmpty(dto.getDienThoai())) {
            throw new InvalidException(messageSource.getMessage("error.sinhviendienthoaiempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getThoiGianTotNghiepDuKien())) {
            throw new InvalidException(messageSource.getMessage("error.sinhvienthoigianempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getNganhDaoTao())) {
            throw new InvalidException(messageSource.getMessage("error.sinhviennganhempty", null, locale));
        }
        if (!dto.getMaSV().trim().equals(sinhVien.getMaSV()) && sinhVienRepository.existsByMaSVIgnoreCase(dto.getMaSV().trim())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.sinhvienexist", null, locale), dto.getMaSV()));
        }
        NganhDaoTao nganhDaoTao = nganhService.getNganhByIdCore(dto.getNganhDaoTao());
        if (nganhDaoTao == null) {
            throw new NotFoundException(String.format(messageSource.getMessage("error.nganhnotfound", null, locale), dto.getNganhDaoTao()));
        }
        sinhVien.setNganhDaoTao(nganhDaoTao);
        sinhVien.setMaSV(dto.getMaSV());
        sinhVien.setHoTen(dto.getHoTen());
        sinhVien.setEmail(dto.getEmail());
        sinhVien.setNgaySinh(dto.getNgaySinh());
        sinhVien.setQueQuan(dto.getQueQuan());
        sinhVien.setGioiTinh(dto.isGioiTinh());
        sinhVien.setDienThoai(dto.getDienThoai());
        sinhVien.setThoiGianTotNghiepDuKien(dto.getThoiGianTotNghiepDuKien());
        sinhVienRepository.save(sinhVien);
        return sinhVien;
    }

    @Override
    public SinhVien changeStatus(String id) {
        SinhVien sinhVien = getSinhVien(id);
        sinhVien.setTrangThai(!sinhVien.isTrangThai());
        sinhVienRepository.save(sinhVien);
        return sinhVien;
    }
}
