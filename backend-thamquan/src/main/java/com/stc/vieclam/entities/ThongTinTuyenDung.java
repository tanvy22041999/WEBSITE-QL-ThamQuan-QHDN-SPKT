package com.stc.vieclam.entities;

import com.stc.vieclam.entities.embedded.HoSoUngTuyen;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/10/21
 * Time      : 15:25
 * Filename  : ThongTinTuyenDung
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "thong-tin-tuyen-dung")
public class ThongTinTuyenDung {
    @Id
    private String id;

    private String tenCongViec;

    private String tenCongViecEn;

    private Date ngayHetHan;

    private List<LinhVuc> linhVucs = new ArrayList<>();

    @ApiModelProperty(value = "Yêu cầu giới tính, null: cả nam và nữ, true: nữ, false: name")
    private Boolean gioiTinh;

    @ApiModelProperty(value = "Nhân viên, chuyên viên, quản lý, giám sát...")
    private String viTriCongViec;

    private String viTriCongViecEn;

    private String phucLoi;

    private String phucLoiEn;

    private String moTaCongViec;

    private String moTaCongViecEn;

    private String yeuCauCongViec;

    @ApiModelProperty(value = "Id nhà tuyển dụng")
    private String nhaTuyenDung;

    private List<HoSoUngTuyen> hoSoUngTuyens = new ArrayList<>();


    @ApiModelProperty(value = "Danh sách các ngành đào tạo phù hợp")
    private List<NganhDaoTao> nganhDaoTaos = new ArrayList<>();

    private double luongKhoiDiem;

    @CreatedDate
    private Date ngayDang;

    @CreatedBy
    private String createdBy;

    private boolean trangThai = true;
}
