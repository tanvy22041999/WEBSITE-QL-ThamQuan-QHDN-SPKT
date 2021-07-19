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
 * Time      : 14:31
 * Filename  : ThoaThuanNguoiDung
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "thoa-thuan-nguoi-dung")
public class ThoaThuanNguoiDung {
    @Id
    private String id;

    private String noiDung;

    private String noiDungEn;

    private boolean trangThai = true;
}
