package university.innopolis.sna.sharding;

import java.net.ServerSocket;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class ServerService {
    private ServerSocket serverSocket;
    private Map<String, String> peerHashTable;
    private Map<String, String> fileHashTable;

    public ServerService() {
        this.peerHashTable = new HashMap<>();
        this.fileHashTable = new HashMap<>();
    }

    public void addFile(final String fileName, final String ipAddress) {
        this.peerHashTable.put(ipAddress, fileName);
        this.fileHashTable.put(fileName, ipAddress);
    }

    public String getPeer(final String fileName) {
        return this.fileHashTable.get(fileName);
    }

    public String getFileName(final String ipAddress) {
        return this.peerHashTable.get(ipAddress);
    }
}
