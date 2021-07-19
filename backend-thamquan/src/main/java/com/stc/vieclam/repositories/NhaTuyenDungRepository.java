package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.NhaTuyenDung;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 13:46
 * Filename  : NhaTuyenDungRepository
 */
public interface NhaTuyenDungRepository extends MongoRepository<NhaTuyenDung, String> {
    Optional<NhaTuyenDung> findByEmail(String email);
}
