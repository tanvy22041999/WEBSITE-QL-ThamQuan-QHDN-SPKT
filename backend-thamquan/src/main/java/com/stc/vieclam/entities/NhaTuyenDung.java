package com.stc.vieclam.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/10/21
 * Time      : 14:54
 * Filename  : NhaTuyenDung
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "nha-tuyen-dung")
public class NhaTuyenDung {
    @Id
    private String id;

    private String email;

    @JsonIgnore
    private String password;

    private String tenCongTy;

    private String tenCongTyEn;

    private String diaChi;

    private String diaChiEn;

    private List<LinhVuc> linhVucs = new ArrayList<>();

    private String website;

    @ApiModelProperty(value = "File logo công ty")
    private String logo;

    private String thoaThuanSuDung;

    private String cacHoatDongHoTroNhaTruong;

    private List<String> roles = new ArrayList<>();

    private boolean trangThai = true;
}
