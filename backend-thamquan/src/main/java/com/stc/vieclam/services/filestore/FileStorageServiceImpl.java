package com.stc.vieclam.services.filestore;

import com.stc.vieclam.configs.FileStorageProperties;
import com.stc.vieclam.dtos.FileStoreResult;
import com.stc.vieclam.exceptions.FileStorageException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.exceptions.ServerException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 13:05
 * Filename  : FileStorageServiceImpl
 */
@Slf4j
@Service
public class FileStorageServiceImpl implements FileStorageService {
    private final Path fileDownloadDirStorageLocation;

    private final Path fileUploadDirStorageLocation;

    private final MessageSource messageSource;

    @Autowired
    public FileStorageServiceImpl(FileStorageProperties fileStorageProperties, MessageSource messageSource) {
        Locale locale = LocaleContextHolder.getLocale();
        this.messageSource = messageSource;
        try {
            this.fileDownloadDirStorageLocation = Paths.get(fileStorageProperties.getDownloadDir()).toAbsolutePath().normalize();
            if (Files.notExists(fileDownloadDirStorageLocation)) {
                File file = fileDownloadDirStorageLocation.toFile();
                file.mkdir();
            }
        } catch (Exception ex) {
            throw new ServerException(messageSource.getMessage("error.initdownloadfolder", null, locale));
        }

        try {
            this.fileUploadDirStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
            if (Files.notExists(fileUploadDirStorageLocation)) {
                File file = fileUploadDirStorageLocation.toFile();
                file.mkdir();
            }
        } catch (Exception ex) {
            throw new ServerException(messageSource.getMessage("error.inituploadfolder", null, locale));
        }
    }

    @Override
    public FileStoreResult storeFile(File file, String subFolder) {
        Locale locale = LocaleContextHolder.getLocale();
        // Normalize file name
        String fileName = generateFileName();
        try {
            Path targetLocation;
            if (!ObjectUtils.isEmpty(subFolder)) {
                if (!Files.exists(Paths.get(this.fileUploadDirStorageLocation.getFileName().toString() + File.separatorChar + subFolder))) {
                    String fullDirectoryPath = this.fileUploadDirStorageLocation.toAbsolutePath() + this.fileUploadDirStorageLocation.getFileName().toString() + File.separator + subFolder;
                    File directory = new File(fullDirectoryPath);
                    directory.mkdir();
                }
                targetLocation = Paths.get(this.fileUploadDirStorageLocation.getFileName().toString() + File.separatorChar +
                        subFolder + File.separatorChar + fileName);
            } else {
                targetLocation = Paths.get(this.fileUploadDirStorageLocation.getFileName().toString() + File.separatorChar + fileName);
            }
            FileUtils.copyFile(file, targetLocation.toFile(), true);
            FileUtils.deleteQuietly(file);
            FileStoreResult fileStoreResult = new FileStoreResult();
            fileStoreResult.setTenFile(fileName);
            fileStoreResult.setDuongDan(targetLocation.toString());
            return fileStoreResult;
        } catch (IOException ex) {
            throw new FileStorageException(messageSource.getMessage(String.format("error.storefile", file.getName()), null, locale));
        }
    }

    @Override
    public Resource loadFile(String location) {
        Locale locale = LocaleContextHolder.getLocale();
        try {
            if (Files.notExists(Paths.get(location))) {
                throw new NotFoundException(messageSource.getMessage("error.fileinvalid",null,locale));
            }
            Path filePath = Paths.get(location);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new NotFoundException(messageSource.getMessage("error.fileinvalid",null,locale));
            }
        } catch (MalformedURLException ex) {
            throw new NotFoundException(messageSource.getMessage("error.fileinvalid",null,locale));
        }
    }

    private String generateFileName() {
        Random random = new Random();
        String result = "";
        for (int i = 0; i < 20; i++) {
            result += (random.nextInt(26) + 'a');
        }
        result += (new SimpleDateFormat("ddmmyyyyHHmmss").format(new Date()));
        return result;
    }
}
