package com.stc.vieclam.controllers.danhmuc;

import com.stc.vieclam.dtos.thongtinlienhe.ThongTinLienHeDto;
import com.stc.vieclam.entities.ThoaThuanNguoiDung;
import com.stc.vieclam.entities.ThongTinLienHe;
import com.stc.vieclam.services.thongtinlienhe.ThongTinLienHeService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 12/5/2021
 * Time: 10:19
 * Filename: ThongTinLienHeController
 */
@RestController
@RequestMapping("/rest/thong-tin-lien-he")
public class ThongTinLienHeController {
    private final ThongTinLienHeService thongTinLienHeService;

    public ThongTinLienHeController(ThongTinLienHeService thongTinLienHeService) {
        this.thongTinLienHeService = thongTinLienHeService;
    }

    @ApiOperation(value = "Tìm kiếm thông tin liên hệ theo họ tên, email, số điện thoại")
    @GetMapping("/paging")
    public ResponseEntity<Page<ThongTinLienHe>> getAllThongTinLienHePaging(
            @RequestParam(value = "search", required = false, defaultValue = "")String search,
            @RequestParam(value = "page", required = false, defaultValue = "${paging.default.page}")int page,
            @RequestParam(value = "size", required = false, defaultValue = "${paging.default.size}")int size,
            @RequestParam(value = "sort", required = false, defaultValue = "asc")String sort,
            @RequestParam(value = "column", required = false, defaultValue = "hoTen")String column){
        return  new ResponseEntity<>(thongTinLienHeService.getAllThongTinLienHePaging(search, page, size, sort, column), HttpStatus.OK);
    }

    @ApiOperation(value = "Get list thông tin liên hệ active (trangThai: true)")
    @GetMapping("/active")
    public ResponseEntity<List<ThongTinLienHe>>getAllThongTinLienHeActive(){
        return new ResponseEntity<>(thongTinLienHeService.getThongTinLienHeTrangThaiTrue(), HttpStatus.OK);
    }

    @ApiOperation(value = "Get thông tin liên hệ by id")
    @GetMapping("/{id}")
    public ResponseEntity<ThongTinLienHe>getThongTinLienHe(@PathVariable String id){
        return new ResponseEntity<>(thongTinLienHeService.getThongTinLienHe(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Create thông tin liên hệ")
    @PostMapping
    public ResponseEntity<ThongTinLienHe>createThongTinLienHe(@Valid @RequestBody ThongTinLienHeDto thongTinLienHeDto){
        return new ResponseEntity<>(thongTinLienHeService.createThongTinLienHe(thongTinLienHeDto), HttpStatus.OK);
    }

    @ApiOperation(value = "Update thông tin liên hệ")
    @PutMapping("/{id}")
    public ResponseEntity<ThongTinLienHe>updateThongTinLienHe(@PathVariable String id ,@Valid @RequestBody ThongTinLienHeDto thongTinLienHeDto){
        return new ResponseEntity<>(thongTinLienHeService.updateThongTinLienHe(id, thongTinLienHeDto), HttpStatus.OK);
    }


    @ApiOperation(value = "Delete thông tin liên hệ")
    @DeleteMapping("/{id}")
    public ResponseEntity<ThongTinLienHe>deleteThongTinLienHe(@PathVariable String id){
        return new ResponseEntity<>(thongTinLienHeService.changeStatus(id),HttpStatus.OK);
    }
}
