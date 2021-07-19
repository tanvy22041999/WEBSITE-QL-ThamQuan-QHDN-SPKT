package com.stc.vieclam.repositories;

import com.stc.vieclam.entities.MyFile;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by: IntelliJ IDEA
 * User      : hung
 * Date      : 4/28/21
 * Time      : 10:00
 * Filename  : MyFileRepository
 */
public interface MyFileRepository extends MongoRepository<MyFile, String> {
}
