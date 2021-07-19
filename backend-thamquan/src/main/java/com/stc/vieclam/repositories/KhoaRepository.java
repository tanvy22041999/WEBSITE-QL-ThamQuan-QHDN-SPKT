package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.Khoa;
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
 * Time      : 14:39
 * Filename  : KhoaRepository
 */
public interface KhoaRepository extends MongoRepository<Khoa,String> {
    @Query(value = "{$or: [{ 'maKhoa' : {$regex: ?0, $options: 'i'} }, "
            + "{ 'tenKhoa' : {$regex: ?0, $options: 'i'}} , {'tenKhoaEn': {$regex: ?0, $options: 'i'}} ]}"
            , sort = "{'trangThai': -1, 'tenKhoa': 1}")
    Page<Khoa> getAllKhoaPaging(String search, Pageable pageable);

    @Query(value = "{$and:[ {$or:[{ 'maKhoa' : { $regex: ?0, $options: 'i' } }, { 'tenKhoa' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'tenKhoaEn' : { $regex: ?0, $options: 'i' }}]}," +
            "{ 'trangThai' : true} ]}", sort = "{'tenKhoa': 1}")
    List<Khoa> getAllKhoas(String search);

    boolean existsByMaKhoaIgnoreCase(String maKhoa);

    Optional<Khoa> getByIdAndTrangThaiTrue(String id);
}
