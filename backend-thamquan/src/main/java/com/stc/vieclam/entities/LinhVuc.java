package com.stc.vieclam.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 11:11
 * Filename  : LinhVuc
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "linh-vuc")
public class LinhVuc {
    @Id
    private String id;

    private int thuTu;

    private String maLinhVuc;

    private String tenLinhVuc;

    private String tenLinhVucEn;

    private boolean trangThai = true;
}
