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
 * Time      : 11:49
 * Filename  : QuaTrinhLamViec
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuaTrinhLamViec {
    private Date tuNgay;

    @ApiModelProperty(value = "Nullable")
    private Date denNgay;

    private String donViCongTac;

    private String moTaCongViec;
}
