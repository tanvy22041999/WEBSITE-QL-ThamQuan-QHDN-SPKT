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
 * Time      : 14:33
 * Filename  : ThongTinLienHe
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "thong-tin-lien-he")
public class ThongTinLienHe {
    @Id
    private String id;

    private String hoTen;

    private String email;

    private String dienThoai;

    private String chucVu;

    private boolean trangThai = true;
}
