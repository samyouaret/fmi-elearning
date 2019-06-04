// data is array of obj are ordered by chapter_id
export default function shapeChapters(data){
  let current_id = 0;
  let current_index = -1;
  let chapters = [];
  // visited_chapters = [];
  for (let chapter_index in data){
    let {chapter_id,chapter_title,...content} = data[chapter_index];
    // console.log(content);
    if(current_id!=data[chapter_index].chapter_id){
      current_id = data[chapter_index].chapter_id;
      current_index++;
       let newChapter = {
        chapter_id : chapter_id,
        chapter_title : chapter_title,
        contents : []
      }
      chapters[current_index] = newChapter;
    }
    if (content.content_id!=null) {
       chapters[current_index].contents.push(content);
    }
  }
  return chapters;
}
