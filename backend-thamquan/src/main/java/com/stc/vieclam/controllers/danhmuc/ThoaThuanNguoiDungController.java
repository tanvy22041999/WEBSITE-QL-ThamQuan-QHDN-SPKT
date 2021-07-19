package com.stc.vieclam.controllers.danhmuc;

import com.stc.vieclam.dtos.thoathuannguoidung.ThoaThuanNguoiDungDto;
import com.stc.vieclam.entities.ThoaThuanNguoiDung;
import com.stc.vieclam.entities.ThongTinLienHe;
import com.stc.vieclam.services.thoathuannguoidung.ThoaThuanNguoiDungService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 12/5/2021
 * Time: 9:57
 * Filename: ThoaThuanNguoiDungController
 */
@RestController
@RequestMapping("/rest/thoa-thuan")
public class ThoaThuanNguoiDungController {
    private final ThoaThuanNguoiDungService thoaThuanNguoiDungService;


    public ThoaThuanNguoiDungController(ThoaThuanNguoiDungService thoaThuanNguoiDungService) {
        this.thoaThuanNguoiDungService = thoaThuanNguoiDungService;
    }

    @ApiOperation(value = "Tìm kiếm thoa thuận theo nội dung, nội dung TA")
    @GetMapping("/paging")
    public ResponseEntity<Page<ThoaThuanNguoiDung>> getAllThoaThuanPaging(
            @RequestParam(value = "search", required = false, defaultValue = "")String search,
            @RequestParam(value = "page", required = false, defaultValue = "${paging.default.page}")int page,
            @RequestParam(value = "size", required = false, defaultValue = "${paging.default.size}")int size,
            @RequestParam(value = "sort", required = false, defaultValue = "asc")String sort,
            @RequestParam(value = "column", required = false, defaultValue = "noiDung")String column){
        return  new ResponseEntity<>(thoaThuanNguoiDungService.getAllThoaThuanNguoiDungPaging(search, page, size, sort, column), HttpStatus.OK);
    }

    @ApiOperation(value = "Get list thỏa thuận active (trangThai: true)")
    @GetMapping("/active")
    public ResponseEntity<List<ThoaThuanNguoiDung>>getAllTHoaThuanActive(){
        return new ResponseEntity<>(thoaThuanNguoiDungService.getThoaThuanNguoiDungTrangThaiTrue(), HttpStatus.OK);
    }

    @ApiOperation(value = "Get thỏa thuận by id")
    @GetMapping("/{id}")
    public ResponseEntity<ThoaThuanNguoiDung>getThoaThuan(@PathVariable String id){
        return new ResponseEntity<>(thoaThuanNguoiDungService.getThoaThuanNguoiDung(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Create thỏa thuận")
    @PostMapping
    public ResponseEntity<ThoaThuanNguoiDung>createThoaThuan(@Valid @RequestBody ThoaThuanNguoiDungDto thoaThuanNguoiDungDto){
        return new ResponseEntity<>(thoaThuanNguoiDungService.createThoaThuanNguoiDung(thoaThuanNguoiDungDto), HttpStatus.OK);
    }

    @ApiOperation(value = "Update thỏa thuận")
    @PutMapping("/{id}")
    public ResponseEntity<ThoaThuanNguoiDung>updateThoaThuan(@PathVariable String id ,@Valid @RequestBody ThoaThuanNguoiDungDto thoaThuanNguoiDungDto){
        return new ResponseEntity<>(thoaThuanNguoiDungService.updateThoaThuanNguoiDung(id, thoaThuanNguoiDungDto), HttpStatus.OK);
    }


    @ApiOperation(value = "Delete thỏa thuận")
    @DeleteMapping("/{id}")
    public ResponseEntity<ThoaThuanNguoiDung>deleteThoaThuan(@PathVariable String id){
        return new ResponseEntity<>(thoaThuanNguoiDungService.changeStatus(id),HttpStatus.OK);
    }
}
