package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.SinhVien;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 13:48
 * Filename  : SinhVienRepository
 */
public interface SinhVienRepository extends MongoRepository<SinhVien, String> {

    Optional<SinhVien> findByEmail(String email);

    Optional<SinhVien> findByMaSV(String maSV);

    Optional<SinhVien> findByIdAndTrangThaiTrue(String id);

    boolean existsByMaSVIgnoreCase(String maSV);
}
