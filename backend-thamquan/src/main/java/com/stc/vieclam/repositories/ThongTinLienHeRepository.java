package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.ThoaThuanNguoiDung;
import com.stc.vieclam.entities.ThongTinLienHe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:41
 * Filename  : ThongTinLienHeRepository
 */
public interface ThongTinLienHeRepository extends MongoRepository<ThongTinLienHe, String> {
    @Query(value = "{$or:[{'hoTen': {$regex: ?0, $options: 'i'}}, "+
            "{'email': {$regex: ?0, $options: 'i'}}, {'dienThoai': {$regex: ?0, $options: 'i'}}"+
            "]}", sort = "{'trangThai': -1, 'hoTen': 1}")
    Page<ThongTinLienHe> getAllThongTinLienHePaging(String search, Pageable pageable);
    Optional<ThongTinLienHe> findByIdAndTrangThaiTrue(String id);

    @Query(value = "{'trangThai': true}")
    List<ThongTinLienHe> getThongTinLienHeByByTrangThaiTrue();
}
