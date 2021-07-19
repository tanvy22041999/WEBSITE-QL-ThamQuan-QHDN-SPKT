package com.stc.vieclam.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:05
 * Filename  : NganhDaoTao
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "nganh-dao-tao")
public class NganhDaoTao {
    @Id
    private String id;

    private int thuTu;

    private String maNganh;

    private String tenNganh;

    private String tenNganhEn;

    @DBRef
    private Khoa khoa;

    private boolean trangThai = true;
}
