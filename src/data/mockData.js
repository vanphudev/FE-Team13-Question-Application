const mockData = {
   listsQuestion: [
      {
         id: "00001",
         userId: "user01",
         userName: "Nguyễn Văn Phú",
         createdAt: "2021-10-01T10:00:00",
         titleQuestion: "Tiêu đề câu hỏi 1",
         descriptionQuestion: "Nội dung câu hỏi 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
         numberLikes: 11,
         listsAnswers: [
            {
               userId: "admin01",
               descriptionAnswer:
                  "Nội dung câu trả lời Nội dung câu hỏi 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec Nội dung câu hỏi 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec Nội dung câu hỏi 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin02",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
         ],
      },
      {
         id: "00002",
         userId: "user02",
         userName: "Nguyễn Văn Phú",
         createdAt: "2021-10-01T10:00:00",
         titleQuestion: "Tiêu đề câu hỏi 1",
         descriptionQuestion: "Nội dung câu hỏi 1",
         numberLikes: 22,
         listsAnswers: [
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin02",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
         ],
      },
      {
         id: "00003",
         userId: "user01",
         userName: "Nguyễn Văn Phú",
         createdAt: "2021-10-01T10:00:00",
         titleQuestion: "Tiêu đề câu hỏi 1",
         descriptionQuestion: "Nội dung câu hỏi 1",
         numberLikes: 1,
         listsAnswers: [
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin02",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
         ],
      },
      {
         id: "00004",
         userId: "user01",
         userName: "Nguyễn Văn Phú",
         createdAt: "2021-10-01T10:00:00",
         titleQuestion: "Tiêu đề câu hỏi 1",
         descriptionQuestion: "Nội dung câu hỏi 1",
         numberLikes: 22,
         listsAnswers: [
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin02",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
         ],
      },
      {
         id: "00005",
         userId: "user02",
         userName: "Nguyễn Văn Phú",
         createdAt: "2021-10-01T10:00:00",
         titleQuestion: "Tiêu đề câu hỏi 1",
         descriptionQuestion: "Nội dung câu hỏi 1",
         numberLikes: 33,
         listsAnswers: [
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin02",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
         ],
      },
      {
         id: "00006",
         userId: "user02",
         userName: "Nguyễn Văn Phú",
         createdAt: "2021-10-01T10:00:00",
         titleQuestion: "Tiêu đề câu hỏi 1",
         descriptionQuestion: "Nội dung câu hỏi 1",
         numberLikes: 55,
         listsAnswers: [
            {
               userId: "admin01",
               descriptionAnswer: "Nội dung câu trả lời ",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
            {
               userId: "admin02",
               descriptionAnswer: "Nội dung câu trả lời !",
               userName: "vanphu",
               createdAt: "2021-10-01T10:00:00",
            },
         ],
      },
   ],
   users: [
      {id: "admin01", name: "Văn Phú", password: "123", userName: "vanphu", role: "admin"},
      {id: "admin02", name: "Văn Phú", password: "123", userName: "vanphu", role: "admin"},
      {id: "user01", name: "Văn Phú", password: "123", userName: "vanphu", role: "user"},
      {id: "user02", name: "Văn Phú", password: "123", userName: "vanphu", role: "user"},
   ],
};

export default mockData;
