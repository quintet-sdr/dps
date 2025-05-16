package university.innopolis.sna.sharding;

import org.springframework.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/api")
public class ShardingController {
    private final ShardingService sharder;

    public ShardingController(final ShardingService sharder) {
        this.sharder = sharder;
    }

    @GetMapping("/files")
    public String[] getFiles(RedirectAttributes redirectAttributes) {
        this.sharder.
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        this.sharder.store(file);
        redirectAttributes.addFlashAttribute()
    }
    
}
