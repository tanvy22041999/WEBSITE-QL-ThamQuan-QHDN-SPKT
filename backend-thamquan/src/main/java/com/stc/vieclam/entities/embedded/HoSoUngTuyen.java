package com.stc.vieclam.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:07
 * Filename  : HoSoUngTuyen
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoSoUngTuyen {
    private String cv;

    @ApiModelProperty(value = "Trạng thái ứng tuyển, lấy từ enum trạng thái ứng tuyển")
    private String trangThai;

    private Date ngayUngTuyen = new Date();
}
