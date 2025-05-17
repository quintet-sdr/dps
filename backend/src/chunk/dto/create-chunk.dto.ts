export class CreateChunkDto {
  file_id: number;
  chunk_index: number;
  node_address: string;
  checksum: string;
  size_bytes: number;
}
