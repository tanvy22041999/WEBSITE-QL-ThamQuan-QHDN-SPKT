package com.stc.vieclam.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/10/21
 * Time      : 15:19
 * Filename  : SinhVien
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sinh-vien")
public class SinhVien {
    @Id
    private String id;

    private String maSV;

    private String hoTen;

    private String email;

    private Date ngaySinh;

    private String queQuan;

    private Date thoiGianTotNghiepDuKien;

    @DBRef
    private NganhDaoTao nganhDaoTao;

    @JsonIgnore
    private String password;

    private List<String> roles = new ArrayList<>();

    private String dienThoai;

    private boolean gioiTinh;

    private boolean trangThai = true;
}
