package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.CV;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 13:49
 * Filename  : CVRepository
 */
public interface CVRepository extends MongoRepository<CV, String> {
}
