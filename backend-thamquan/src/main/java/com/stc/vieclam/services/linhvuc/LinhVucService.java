package com.stc.vieclam.services.linhvuc;

import com.stc.vieclam.dtos.linhvuc.LinhVucDto;
import com.stc.vieclam.entities.LinhVuc;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:42
 * Filename  : LinhVucService
 */
public interface LinhVucService {
    Page<LinhVuc> getAllLinhVucPaging(String search, int page, int size, String sort, String column);

    List<LinhVuc> getLinhVucs(String search);

    LinhVuc getLinhVuc(String id);

    LinhVuc getLinhVucByIdCore(String id);

    LinhVuc createLinhVuc(LinhVucDto dto);

    LinhVuc updateLinhVuc(String id, LinhVucDto dto);

    LinhVuc changeStatus(String id);
}
