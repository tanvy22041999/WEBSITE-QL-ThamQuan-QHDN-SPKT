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
 * Time      : 14:26
 * Filename  : Khoa
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "khoa")
public class Khoa {
    @Id
    private String id;

    private int thuTu;

    private String maKhoa;

    private String tenKhoa;

    private String tenKhoaEn;

    private boolean trangThai = true;
}
