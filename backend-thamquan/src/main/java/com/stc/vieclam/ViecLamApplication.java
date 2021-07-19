package com.stc.vieclam;

import com.stc.vieclam.entities.CauHinhHeThong;
import com.stc.vieclam.entities.TaiKhoan;
import com.stc.vieclam.repositories.CauHinhHeThongRepository;
import com.stc.vieclam.repositories.TaiKhoanRepository;
import com.stc.vieclam.utils.EnumRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Collections;

@EnableAsync
@EnableEurekaClient
@SpringBootApplication
public class ViecLamApplication implements CommandLineRunner {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private CauHinhHeThongRepository cauHinhHeThongRepository;

    public static void main(String[] args) {
        SpringApplication.run(ViecLamApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        initData();
    }

    private void initData(){
        if (taiKhoanRepository.count() == 0) {
            TaiKhoan taiKhoan = new TaiKhoan();
            taiKhoan.setEmail("thangpx@hcmute.edu.vn");
            taiKhoan.setPassword("123456@$2021");
            taiKhoan.setHoTen("Thắng Phạm");
            taiKhoan.setTrangThai(true);
            taiKhoan.setRoles(Collections.singletonList(EnumRole.ROLE_ADMIN.name()));
            taiKhoanRepository.save(taiKhoan);
            System.out.println("Complete init tài khoản");
        }

        if(cauHinhHeThongRepository.count()==0){
            CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
            cauHinhHeThong.setEmailGuiThu("dev1.stc@hcmute.edu.vn");
            cauHinhHeThong.setPasswordEmailGuiThu("stc-dev@123456");
            cauHinhHeThong.setEmailNhanThu("dev5.stc@hcmute.edu.vn");
            cauHinhHeThongRepository.save(cauHinhHeThong);
            System.out.println("Complete init cấu hình hệ thống");
        }
    }
}
