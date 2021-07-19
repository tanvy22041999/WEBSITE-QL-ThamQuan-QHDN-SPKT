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
 * Time      : 13:59
 * Filename  : QuaTrinhHocTap
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuaTrinhHocTap {
    private Date tuNgay;

    @ApiModelProperty(value = "Nullable")
    private Date denNgay;
}
