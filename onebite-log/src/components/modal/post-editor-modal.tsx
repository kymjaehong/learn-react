import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSession } from "@/store/session";
import { useOpenAlertModal } from "@/store/alert-modal";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
  const { isOpen, close } = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => {
          close();
        },
        // onNegative: () => {},
      });

      return;
    }
    close();
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;
    createPost({
      content,
      images: images.map((image) => image.file),
      userId: session!.user.id,
    });
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
      // URL.createObjectURL(file)
      // 내부적으로 previewUrl 생성을 위해
      // 인자로 전달된 파일을 브라우저 메모리에 저장됩니다.
      // 그리고 해당 파일에 접근 가능한 주소를 반환하는 방식으로 동작합니다.
      // 따라서, 모달창을 닫거나 선택한 사진을 지울 때 URL.revokeObjectURL(image.previewUrl) 메서드를 호출해서 메모리를 비워줘야 합니다.
    }

    // 자유로운 파일 선택을 위한 입력값 초기화
    // 안 했을시, 사용자가 동일한 파일을 2번 이상 업로드하려 할 때
    // 입력값이 바뀌지 않았다고 인식을 해서 이벤트핸들러가 아예 동작하지 않을 수 있다.
    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  // 편의기능
  // 1. 사용자가 textarea에 값을 입력할 때마다 Ref 객체를 이용해서 높이 수정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // 2. textarea에 포커싱
  useEffect(() => {
    if (!isOpen) {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }
    textareaRef.current?.focus();

    // 3. 모달 닫히면 작성 중이던 내용 초기화
    setContent("");
    setImages([]);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          disabled={isCreatePostPending}
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
        />
        <input
          onChange={handleSelectImages}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}
          disabled={isCreatePostPending}
          variant={"outline"}
          className="cursor-pointer"
        >
          이미지 추가
          <ImageIcon />
        </Button>
        <Button
          disabled={isCreatePostPending}
          onClick={handleCreatePostClick}
          className="cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
