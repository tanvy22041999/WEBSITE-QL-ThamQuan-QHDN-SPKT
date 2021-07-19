package com.stc.vieclam.entities;

import com.stc.vieclam.entities.embedded.QuaTrinhHocTap;
import com.stc.vieclam.entities.embedded.QuaTrinhLamViec;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/10/21
 * Time      : 15:22
 * Filename  : CV
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cv")
public class CV {
    @Id
    private String id;

    private SinhVien sinhVien;

    @ApiModelProperty(value = "Hình thẻ 3x4")
    private String hinhThe;

    private String mucTieuNgheNghiep;

    private String mucTieuNgheNghiepEn;

    private String hocVan;

    private String hocVanEn;

    private List<QuaTrinhHocTap> quaTrinhHocTaps = new ArrayList<>();

    private List<QuaTrinhLamViec> quaTrinhLamViecs = new ArrayList<>();

    private String giaiThuong;

    @ApiModelProperty(value = "Danh sách các id file chứng chỉ")
    private List<String> chungChis = new ArrayList<>();

    @CreatedDate
    private Date createdDate;

    @LastModifiedDate
    private Date lastModifiedDate;

    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String lastModifiedBy;

    private boolean trangThai = true;
}
