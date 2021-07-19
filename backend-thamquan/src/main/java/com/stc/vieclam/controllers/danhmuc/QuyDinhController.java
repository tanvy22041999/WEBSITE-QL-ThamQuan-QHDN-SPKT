package com.stc.vieclam.controllers.danhmuc;

import com.stc.vieclam.dtos.quydinh.QuyDinhDto;
import com.stc.vieclam.entities.QuyDinh;
import com.stc.vieclam.services.quydinh.QuyDinhService;
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
 * Time: 10:14
 * Filename: QuyDinhController
 */
@RestController
@RequestMapping("/rest/quy-dinh")
public class QuyDinhController {
    private final QuyDinhService quyDinhService;

    public QuyDinhController(QuyDinhService quyDinhService) {
        this.quyDinhService = quyDinhService;
    }


    @ApiOperation(value = "Tìm kiếm quy định theo nội dung, nội dung TA")
    @GetMapping("/paging")
    public ResponseEntity<Page<QuyDinh>> getAllQuyTrinhPaging(
            @RequestParam(value = "search", required = false, defaultValue = "")String search,
            @RequestParam(value = "page", required = false, defaultValue = "${paging.default.page}")int page,
            @RequestParam(value = "size", required = false, defaultValue = "${paging.default.size}")int size,
            @RequestParam(value = "sort", required = false, defaultValue = "asc")String sort,
            @RequestParam(value = "column", required = false, defaultValue = "noiDung")String column){
        return  new ResponseEntity<>(quyDinhService.getAllQuyDinhPaging(search, page, size, sort, column), HttpStatus.OK);
    }

    @ApiOperation(value = "Get list quy định active (trangThai: true)")
    @GetMapping("/active")
    public ResponseEntity<List<QuyDinh>>getAllTHoaThuanActive(){
        return new ResponseEntity<>(quyDinhService.getQuyDinhTrangThaiTrue(), HttpStatus.OK);
    }

    @ApiOperation(value = "Get thỏa thuận by id")
    @GetMapping("/{id}")
    public ResponseEntity<QuyDinh>getQuyDinh(@PathVariable String id){
        return new ResponseEntity<>(quyDinhService.getQuyDinh(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Create quy định")
    @PostMapping
    public ResponseEntity<QuyDinh>createQuyDinh(@Valid @RequestBody QuyDinhDto quyDinhDto){
        return new ResponseEntity<>(quyDinhService.createQuyDinh(quyDinhDto), HttpStatus.OK);
    }

    @ApiOperation(value = "Update quy định")
    @PutMapping("/{id}")
    public ResponseEntity<QuyDinh>updateQuyDinh(@PathVariable String id ,@Valid @RequestBody QuyDinhDto quyDinhDto){
        return new ResponseEntity<>(quyDinhService.updateQuyDinh(id, quyDinhDto), HttpStatus.OK);
    }


    @ApiOperation(value = "Delete quy định")
    @DeleteMapping("/{id}")
    public ResponseEntity<QuyDinh>deleteQuyDinh(@PathVariable String id){
        return new ResponseEntity<>(quyDinhService.changeStatus(id),HttpStatus.OK);
    }
}
