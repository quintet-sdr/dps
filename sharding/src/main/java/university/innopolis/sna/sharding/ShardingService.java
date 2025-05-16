package university.innopolis.sna.sharding;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.web.multipart.*;

public class ShardingService {

    private final Path rootLocation;

    @Autowired
    public ShardingService(ShardProperties properties) {

        if (properties.getLocation().trim().isEmpty()) {
            throw new IllegalStateException("File path location can not be empty");
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    void init();

    void store(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        Path destination = this.rootLocation.resolve(file.getOriginalFilename()).normalize().toAbsolutePath();

        try (InputStream stream = file.getInputStream()) {
            Files.copy(stream, destination, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }

    }

    Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1).filter(path -> !path.equals(this.rootLocation));
        }
    }

    Path load(String filename);

    Resource lodAResource(String filename);

    void delete(String filename) throws FileNotFoundException;
    void deleteAll();


}
