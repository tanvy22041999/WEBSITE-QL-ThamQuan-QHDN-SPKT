package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.ThongTinTuyenDung;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:48
 * Filename  : ThongTinTuyenDungRepository
 */
public interface ThongTinTuyenDungRepository extends MongoRepository<ThongTinTuyenDung, String> {
}
