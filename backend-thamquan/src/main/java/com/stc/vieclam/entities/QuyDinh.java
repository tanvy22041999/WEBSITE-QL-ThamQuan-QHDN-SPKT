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
 * Time      : 14:32
 * Filename  : QuyDinh
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quy-dinh")
public class QuyDinh {
    @Id
    private String id;

    private String noiDung;

    private String noiDungEn;

    private boolean trangThai = true;
}
