package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.NganhDaoTao;
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
 * Time      : 14:06
 * Filename  : NganhDaoTaoRepository
 */
public interface NganhDaoTaoRepository extends MongoRepository<NganhDaoTao, String> {

    @Query(value = "{$or:[{ 'tenNganh' : { $regex: ?0, $options: 'i' } }, { 'maNganh' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'tenNganhEn' : { $regex: ?0, $options: 'i' } }]}"
            , sort = "{'trangThai': -1, 'thuTu': 1}")
    Page<NganhDaoTao> getAllNganhPaging(String search, Pageable pageable);

    @Query(value = "{$and:[ {'khoa._id': ?0}, {'trangThai': true} ]}", sort = "{'thuTu': 1}")
    List<NganhDaoTao> getAllNganhByKhoaId(String khoaId);

    @Query(value = "{$and:[ {$or:[{'maNganh': {$regex: ?0, $options: 'i'}}, {'tenNganh': {$regex: ?0, $options: 'i'}}]}," +
            "{'tenNganhEn' : { $regex: ?0, $options: 'i' }}, { 'trangThai' : true} ]}", sort = "{'thuTu': 1}")
    List<NganhDaoTao> getAllNganhActive(String search);

    boolean existsByMaNganhIgnoreCase(String maNganh);

    Optional<NganhDaoTao> findByIdAndTrangThaiTrue(String id);
}
