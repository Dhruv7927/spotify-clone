import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStores } from "@/stores/useMusicStores"
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
    const { songs, isLoading, error, deleteSong } = useMusicStores();

    if (isLoading) {
        return (
            <div className='flex items-center justify-center py-8'>
                <div className='text-zinc-400'>Loading songs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center py-8'>
                <div className='text-red-400'>{error}</div>
            </div>
        );
    }

    console.log("Fetched songs:", songs);

    return (
        <Table>
            <TableHeader>
                <TableRow className='hover:bg-zinc-800/50 border-b border-zinc-700'>
                    <TableHead className='w-[50px]'></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {songs.map((song) => (
                    <TableRow key={song._id}  className='hover:bg-zinc-800/50 border-b border-zinc-800'>
                        <TableCell>
							<img src={song.imageUrl} alt={song.title} className='size-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium'>{song.title}</TableCell>
						<TableCell>{song.artist}</TableCell>
                        <TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{song.createdAt ? song.createdAt.split("T")[0] : "N/A"}
							</span>
						</TableCell>

                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant={"ghost"} size={"sm"} 
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                onClick={() => deleteSong(song._id)}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SongsTable