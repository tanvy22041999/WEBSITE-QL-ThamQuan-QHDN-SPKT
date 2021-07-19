package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.LinhVuc;
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
 * Time      : 13:48
 * Filename  : LinhVucRepository
 */
public interface LinhVucRepository extends MongoRepository<LinhVuc, String> {
    @Query(value = "{$or:[{ 'maLinhVuc' : { $regex: ?0, $options: 'i' } }, { 'tenLinhVuc' : { $regex: ?0, $options: 'i' } }" +
            ", { 'tenLinhVucEn' : { $regex: ?0, $options: 'i' }}]}"
            , sort = "{'trangThai': -1, 'tenLinhVuc': 1}")
    Page<LinhVuc> getAllLinhVucPaging(String search, Pageable pageable);

    @Query(value = "{$and:[ {$or:[{ 'maLinhVuc' : { $regex: ?0, $options: 'i' } }, { 'tenLinhVuc' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'tenLinhVucEn' : { $regex: ?0, $options: 'i' }}]}," +
            "{ 'trangThai' : true} ]}", sort = "{'tenLinhVuc': 1}")
    List<LinhVuc> getLinhVucs(String search);

    Optional<LinhVuc> findByIdAndTrangThaiTrue(String id);

    boolean existsByMaLinhVucIgnoreCase(String maLinhVuc);
}
