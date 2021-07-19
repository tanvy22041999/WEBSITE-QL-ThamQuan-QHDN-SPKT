package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.QuyDinh;
import com.stc.vieclam.entities.ThoaThuanNguoiDung;
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
 * Filename  : ThoaThuanNguoiDungRepository
 */
public interface ThoaThuanNguoiDungRepository extends MongoRepository<ThoaThuanNguoiDung, String> {
    @Query(value = "{$or:[{'noiDung': {$regex: ?0, $options: 'i'}}, "+
            "{'noiDungEn': {$regex: ?0, $options: 'i'}},"+
            "]}", sort = "{'trangThai': -1}")
    Page<ThoaThuanNguoiDung> getAllThoaThuanNguoiDungPaging(String search, Pageable pageable);
    Optional<ThoaThuanNguoiDung> findByIdAndTrangThaiTrue(String id);

    @Query(value = "{'trangThai': true}")
    List<ThoaThuanNguoiDung> getThoaThuanNguoiDungByTrangThaiTrue();
}
