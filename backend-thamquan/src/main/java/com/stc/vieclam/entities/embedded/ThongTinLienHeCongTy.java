package com.stc.vieclam.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 13:42
 * Filename  : ThongTinLienHeCongTy
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinLienHeCongTy {
    private String nguoiDaiDien;

    private String dienThoai;

    @ApiModelProperty(value = "email của người đại diện")
    private String email;

    private String chucVu;
}
