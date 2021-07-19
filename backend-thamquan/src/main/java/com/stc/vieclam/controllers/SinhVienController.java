package com.stc.vieclam.controllers;

import com.stc.vieclam.dtos.sinhvien.FilterSinhVienDto;
import com.stc.vieclam.dtos.sinhvien.SinhVienDto;
import com.stc.vieclam.entities.SinhVien;
import com.stc.vieclam.services.sinhvien.SinhVienService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 14:51
 * Filename  : SinhVienController
 */
@RestController
@RequestMapping("/rest/sinh-vien")
public class SinhVienController {
    private final SinhVienService sinhVienService;

    public SinhVienController(SinhVienService sinhVienService) {
        this.sinhVienService = sinhVienService;
    }

    @ApiOperation(value = "Get current sinh viên")
    @GetMapping("/current")
    public ResponseEntity<SinhVien> getCurrentSinhVien(Principal principal) {
        return new ResponseEntity<>(sinhVienService.getCurrentSinhVien(principal), HttpStatus.OK);

    }

    @ApiOperation(value = "Get sinh viên by id")
    @GetMapping("/{id}")
    public ResponseEntity<SinhVien> getSinhVienById(@PathVariable String id) {
        return new ResponseEntity<>(sinhVienService.getSinhVien(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Filter sinh viên theo mã sinh viên, email, họ tên, khoa, ngành")
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KY_KHOA')")
    @PostMapping("/filter")
    public ResponseEntity<Page<SinhVien>> filter(
            @Valid @RequestBody FilterSinhVienDto dto,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "desc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "trangThai") String column) {
        return new ResponseEntity<>(sinhVienService.filter(dto, page, size, sort, column), HttpStatus.OK);
    }

    /***
     * @author: hung
     * @createDate: 05-11-2021
     * @lastModified:
     * @changeBy:
     * @lastChange:
     * @param dto: dto của sinh viên
     * @return
     */
    @ApiOperation(value = "Create sinh viên (admin)")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<SinhVien> createSinhVien(@Valid @RequestBody SinhVienDto dto) {
        return new ResponseEntity<>(sinhVienService.createSinhVien(dto), HttpStatus.OK);
    }

    /***
     * @author: hung
     * @createDate: 05-11-2021
     * @lastModified:
     * @changeBy:
     * @lastChange:
     * @param id: id của sinh viên
     * @param dto: dto của sinh viên
     * @return
     */
    @ApiOperation(value = "Update sinh viên")
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<SinhVien> updateSinhVien(@PathVariable String id, @Valid @RequestBody SinhVienDto dto) {
        return new ResponseEntity<>(sinhVienService.updateSinhVien(id, dto), HttpStatus.OK);
    }

    /***
     * @author: hung
     * @createDate: 06-04-2021
     * @param id: Id sinh viên cần thay đổi trạng thái
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @ApiOperation(value = "change status sinh viên")
    @DeleteMapping("/{id}")
    public ResponseEntity<SinhVien> changeStatus(@PathVariable String id){
        return new ResponseEntity<>(sinhVienService.changeStatus(id),HttpStatus.OK);
    }
}
