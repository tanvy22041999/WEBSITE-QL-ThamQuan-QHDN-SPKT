package com.stc.vieclam.dtos.sinhvien;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/13/21
 * Time      : 10:59
 * Filename  : FilterSinhVienDto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterSinhVienDto {
    @ApiModelProperty(value = "Tiếm kiếm theo mã sinh viên, email, họ tên sinh viên, điện thoại")
    private String search;

    @ApiModelProperty(value = "Id Ngành")
    private String nganh;

    @ApiModelProperty(value = "Id Khoa")
    private String khoa;
}
