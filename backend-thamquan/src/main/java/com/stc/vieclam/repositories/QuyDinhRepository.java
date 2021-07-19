package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.QuyDinh;
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
 * Time      : 14:40
 * Filename  : QuyDinhRepository
 */


public interface QuyDinhRepository extends MongoRepository<QuyDinh,String> {
    @Query(value = "{$or:[{'noiDung': {$regex: ?0, $options: 'i'}}, "+
            "{'noiDungEn': {$regex: ?0, $options: 'i'}},"+
            "]}", sort = "{'trangThai': -1}")
    Page<QuyDinh> getAllQuyDinhsPaging(String search, Pageable pageable);
    Optional<QuyDinh> findByIdAndTrangThaiTrue(String id);

    @Query(value = "{'trangThai': true}")
    List<QuyDinh> getQuyDinhByTrangThaiTrue();
}
