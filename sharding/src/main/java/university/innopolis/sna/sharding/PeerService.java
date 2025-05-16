package university.innopolis.sna.sharding;

public class PeerService {
    
    private ServerService server;

    public void searchFile(final String fileName) {
        final String ipAddress = this.server.getPeer(fileName);
        if (ipAddress.isEmpty() != null) {

        }
    }

    public void downloadFile(final String ipAddress, final String fileName) {
        
    }
}
