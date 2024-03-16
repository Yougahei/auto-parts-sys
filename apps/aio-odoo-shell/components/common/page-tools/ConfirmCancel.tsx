import { Button } from "@ui/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/components/ui/dialog";

interface Props {
    onConfirm: () => void;
}

export function ConfirmCancel({ onConfirm }: Props) {
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-500">
                        确认取消?
                    </DialogTitle>
                    <DialogDescription>
                        取消后将不会保存任何修改，页面数据将会全部丢失。
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>
                    <div className="w-full justify-end flex space-x-3 ">
                        <Button
                            type="button"
                            onClick={() => onConfirm()}
                            variant="destructive"
                        >
                            确认取消
                        </Button>
                        <Button type="button">我再想想</Button>
                    </div>
                </DialogClose>
            </DialogContent>
            <DialogTrigger asChild>
                <Button variant="destructive">取消</Button>
            </DialogTrigger>
        </Dialog>
    );
}
