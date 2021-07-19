package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.CauHinhHeThong;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/11/21
 * Time      : 14:37
 * Filename  : CauHinhHeThongRepository
 */
public interface CauHinhHeThongRepository extends MongoRepository<CauHinhHeThong, String> {
}
