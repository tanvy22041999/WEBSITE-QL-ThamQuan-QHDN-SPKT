package com.stc.vieclam.services.quydinh;

import com.stc.vieclam.dtos.quydinh.QuyDinhDto;
import com.stc.vieclam.entities.QuyDinh;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:44
 * Filename  : QuyDinhService
 */
public interface QuyDinhService {
    QuyDinh getQuyDinhCoreById(String id);
    Page<QuyDinh> getAllQuyDinhPaging(String search, int page, int size, String sort, String column);
    QuyDinh createQuyDinh(QuyDinhDto quyDinhDto);
    QuyDinh updateQuyDinh(String id, QuyDinhDto quyDinhDto);
    QuyDinh changeStatus(String id);
    QuyDinh getQuyDinh(String id);
    List<QuyDinh> getQuyDinhTrangThaiTrue();
}
