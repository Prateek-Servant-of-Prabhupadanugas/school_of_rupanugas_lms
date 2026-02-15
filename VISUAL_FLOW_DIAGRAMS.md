# 📊 Visual Flow Diagram - Video Player System

## Complete User Journey 🎬

```
┌─────────────────────────────────────────────────────────────┐
│                      HOME PAGE                              │
│  [Course 1] [Course 2] [Course 3] ...                       │
└──────────────┬────────────────────────────────────────────┘
               │ Click Course
               ↓
┌─────────────────────────────────────────────────────────────┐
│              COURSE DETAIL PAGE                             │
│  ├─ Course Title                                            │
│  ├─ Course Description                                      │
│  ├─ Price: ₹2000                                            │
│  ├─ Enrolled: ✓ Yes (Verified)                              │
│  └─ [🎥 Watch Course Button]  ← Click here                  │
└──────────────┬────────────────────────────────────────────┘
               │ Click "Watch Course"
               ↓ Navigate to /watch/:courseId
┌─────────────────────────────────────────────────────────────┐
│              LESSON LIST PAGE (NEW!)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Back to Course                                      │   │
│  │                                                     │   │
│  │ Course Title                                        │   │
│  │ 3 Lessons • Tap a lesson to begin watching         │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  [1] Sacred Philosophy                             │   │
│  │      Learn the basics...                           │   │
│  │      🎬 2 Videos                    [Play →]       │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  [2] Practical Application                         │   │
│  │      How to apply in life...                       │   │
│  │      🎬 3 Videos                    [Play →]       │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  [3] Advanced Topics                               │   │
│  │      Deep understanding...                         │   │
│  │      🎬 1 Video                     [Play →]       │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────┬────────────────────────────────────────────┘
               │ Click [Play →] on Lesson 2
               ↓ Navigate to /video/:courseId/:lessonId/0
┌─────────────────────────────────────────────────────────────┐
│           VIDEO PLAYER PAGE (NEW & IMPROVED!)              │
│                                                             │
│  Home / Courses / Sacred Philosophy / Practical...         │
│  ┌───────────────────────────────────────────────────┐    │
│  │                                                   │    │
│  │                                                   │    │
│  │          ┌─────────────────────────┐             │    │
│  │          │                         │             │    │
│  │          │   [🎥 VIDEO PLAYER]     │  100%       │    │
│  │          │   Full Screen Video     │  width      │    │
│  │          │                         │             │    │
│  │          │  Shows Video            │             │    │
│  │          │  Part 1 of 3            │             │    │
│  │          │                         │             │    │
│  │          │  (Playing YouTube ID)   │             │    │
│  │          │                         │             │    │
│  │          └─────────────────────────┘             │    │
│  │                                                   │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [← Previous Part] Part 1 of 3  ███░░░░  [Next Part →] │
│  │                   ▲                                  │   │
│  │              Progress Bar                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ About This Lesson                                   │   │
│  │                                                     │   │
│  │ Practical Application - How to apply in life...    │   │
│  │                                                     │   │
│  │ Lorem ipsum dolor sit amet, consectetur adipiscing  │   │
│  │ elit. Sed do eiusmod tempor incididunt ut labore.   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│                  [← Back to All Lessons]                  │
└──────────────┬────────────────────────────────────────────┘
               │ Click [Next Part →]
               ↓ Navigate to /video/:courseId/:lessonId/1
               │ (Same page, different video)
               │
               ├─ Video loads (Part 2)
               ├─ Shows "Part 2 of 3"
               ├─ Progress bar updates
               ├─ Can click Next again or Previous
               │
               └─ Continue navigation as needed...
                  ↓ Click [← Back to All Lessons]
                  ↓ Navigate to /watch/:courseId
                  └─ Back to Lesson List
```

---

## Data Flow Architecture 🏗️

```
DATABASE (Appwrite)
│
├─ Courses Collection
│  └─ course_123
│     ├─ title: "Sacred Philosophy"
│     ├─ description: "..."
│     └─ price: 2000
│
├─ Lessons Collection
│  └─ lesson_456
│     ├─ courseId: "course_123"
│     ├─ title: "Practical Application"
│     ├─ description: "How to apply..."
│     ├─ order: 2
│     └─ youtubeIds: ["dQw4w9WgXcQ", "jNQXAC9IVRw", "pour9LM8LF7U"]
│
└─ Enrollments Collection
   └─ enrollment_789
      ├─ userId: "user_101"
      ├─ courseId: "course_123"
      └─ status: "Verified"

        ↓ (Appwrite Query)

REACT COMPONENTS
│
├─ CourseDetail.jsx
│  └─ Displays: title, description, price
│     Button: "Watch Course" → /watch/:courseId
│
├─ LessonDetail.jsx (LIST VIEW)
│  └─ Displays: Lesson list from database
│     Queries: GET all lessons where courseId = "course_123"
│     Button: [Play →] → /video/:courseId/:lessonId/0
│
└─ VideoPlayer.jsx (PLAYER VIEW)
   └─ Displays: Single video with controls
      Queries: GET lesson by lessonId
      Current video: youtubeIds[videoIndex]
      Buttons: [← Previous] [Next →] → Update videoIndex
```

---

## Component Interaction Flow 🔄

```
┌─────────────────────────────────────────────┐
│        LessonDetail Component                │
│   (Shows list of all lessons)                │
│                                             │
│  useParams: courseId                        │
│  useState: lessons = []                     │
│                                             │
│  useEffect:                                 │
│  ├─ Check enrollment (Verified?)            │
│  ├─ Query database for lessons              │
│  │  WHERE courseId = params.courseId        │
│  │  SORT BY order ASC                       │
│  └─ Set lessons state                       │
│                                             │
│  Render:                                    │
│  ├─ For each lesson:                        │
│  │  ├─ Show [1] Lesson Title                │
│  │  ├─ Show description                     │
│  │  ├─ Show video count                     │
│  │  └─ Button: Link to VideoPlayer          │
│  │     onClick: /video/:courseId/:lessonId/0
│  │                                          │
│  └─ Back button: Link to /course/:id        │
└─────────────────────────────────────────────┘
                    │
                    │ Click [Play →]
                    ↓
┌─────────────────────────────────────────────┐
│       VideoPlayer Component                  │
│   (Shows single video + controls)            │
│                                             │
│  useParams:                                 │
│  ├─ courseId                                │
│  ├─ lessonId                                │
│  └─ videoIndex (0, 1, 2, ...)              │
│                                             │
│  useState:                                  │
│  ├─ lesson = null                           │
│  ├─ course = null                           │
│  ├─ currentVideoIndex = videoIndex          │
│  └─ videoError = false                      │
│                                             │
│  useEffect:                                 │
│  ├─ Check enrollment (Verified?)            │
│  ├─ Query: GET lesson by lessonId           │
│  ├─ Query: GET course by courseId           │
│  └─ Fetch lesson data                       │
│                                             │
│  Calculate:                                 │
│  ├─ youtubeIds = lesson.youtubeIds          │
│  ├─ currentVideoId = youtubeIds[index]      │
│  ├─ totalVideos = youtubeIds.length         │
│  └─ canGoPrevious = index > 0               │
│  └─ canGoNext = index < (length - 1)        │
│                                             │
│  Functions:                                 │
│  ├─ nextVideo()                             │
│  │  └─ setCurrentVideoIndex(index + 1)      │
│  │     └─ Triggers new embed URL            │
│  │                                          │
│  └─ prevVideo()                             │
│     └─ setCurrentVideoIndex(index - 1)      │
│        └─ Triggers new embed URL            │
│                                             │
│  Render:                                    │
│  ├─ <iframe> with YouTube embed URL:        │
│  │  src={`youtube.com/embed/${currentVideoId}`}
│  ├─ Progress: "Part {index+1} of {length}"  │
│  ├─ Progress Bar: {(index+1/length)*100}%   │
│  ├─ Button: [← Previous] (disabled if 0)    │
│  ├─ Button: [Next →] (disabled if last)     │
│  ├─ Lesson description                      │
│  └─ Back button: Link to /watch/:courseId   │
└─────────────────────────────────────────────┘
                    │
        ├─ Click [← Previous]
        │  └─ setCurrentVideoIndex(index - 1)
        │     └─ Re-render with new video
        │
        ├─ Click [Next →]
        │  └─ setCurrentVideoIndex(index + 1)
        │     └─ Re-render with new video
        │
        ├─ Click [← Back to Lessons]
        │  └─ Navigate to /watch/:courseId
        │     └─ Return to LessonDetail
        │
        └─ Video fails?
           └─ Show error UI
              └─ Still allow navigation
```

---

## Database Query Map 🗺️

```
┌──────────────────────────────────────────────────┐
│           LessonDetail Queries                   │
├──────────────────────────────────────────────────┤
│                                                  │
│ 1. Check Enrollment:                             │
│    Query: enrollments                            │
│    WHERE courseId = params.courseId              │
│    AND userId = user.$id                         │
│    AND status = "Verified"                       │
│    → Result: hasAccess (true/false)              │
│                                                  │
│ 2. Get All Lessons:                              │
│    Query: lessons                                │
│    WHERE courseId = params.courseId              │
│    ORDER BY order ASC                            │
│    → Result: lessons array                       │
│       [                                          │
│         { $id, title, description, youtubeIds } │
│         { $id, title, description, youtubeIds } │
│         ...                                      │
│       ]                                          │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│          VideoPlayer Queries                     │
├──────────────────────────────────────────────────┤
│                                                  │
│ 1. Check Enrollment:                             │
│    Query: enrollments                            │
│    WHERE courseId = params.courseId              │
│    AND userId = user.$id                         │
│    AND status = "Verified"                       │
│    → Result: hasAccess (true/false)              │
│                                                  │
│ 2. Get Lesson Details:                           │
│    Query: lessons (getDocument)                  │
│    WHERE $id = params.lessonId                   │
│    → Result: {                                   │
│        title: "Practical Application"            │
│        description: "How to apply in life..."    │
│        youtubeIds: ["ID1", "ID2", "ID3"]         │
│      }                                           │
│                                                  │
│ 3. Get Course Details:                           │
│    Query: courses (getDocument)                  │
│    WHERE $id = params.courseId                   │
│    → Result: {                                   │
│        title: "Sacred Philosophy"                │
│      }                                           │
└──────────────────────────────────────────────────┘
```

---

## YouTube Embed Integration 🎥

```
Database
│
└─ lesson_456
   └─ youtubeIds: ["dQw4w9WgXcQ", "jNQXAC9IVRw", "pour9LM8LF7U"]
      │
      ├─ [0] → "dQw4w9WgXcQ"
      ├─ [1] → "jNQXAC9IVRw"  
      └─ [2] → "pour9LM8LF7U"
                │
                ↓ (VideoPlayer uses videoIndex)
         
VideoPlayer State
│
├─ videoIndex = 0
├─ currentVideoId = youtubeIds[0] = "dQw4w9WgXcQ"
│
└─ Render:
   └─ <iframe>
      src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
      │
      └─ YouTube loads video
         └─ User can watch

Click [Next →]
│
└─ videoIndex = 1
   └─ currentVideoId = youtubeIds[1] = "jNQXAC9IVRw"
      │
      └─ <iframe> re-renders
         src={`https://www.youtube.com/embed/jNQXAC9IVRw`}
         │
         └─ Different video loads
```

---

## State Management 📊

### LessonDetail State:
```javascript
const [lessons, setLessons] = useState([])
// Updated on mount from database

const [course, setCourse] = useState(null)
// Updated on mount from database

const [hasAccess, setHasAccess] = useState(false)
// Set based on enrollment query

const [loading, setLoading] = useState(true)
// Loading indicator during data fetch
```

### VideoPlayer State:
```javascript
const [lesson, setLesson] = useState(null)
// Individual lesson data

const [course, setCourse] = useState(null)
// Course for breadcrumb

const [hasAccess, setHasAccess] = useState(false)
// Enrollment verification

const [loading, setLoading] = useState(true)
// Loading indicator

const [videoError, setVideoError] = useState(false)
// Video failed to load

const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
// Which video in youtubeIds array
```

---

## Navigation State Machine 🔄

```
┌─────────────────┐
│   HOME PAGE     │
└────────┬────────┘
         │
         │ Click Course
         ↓
┌─────────────────────────┐
│  COURSE DETAIL PAGE     │
└────────┬────────────────┘
         │
         │ Click "Watch"
         ↓
┌──────────────────────────────────────────┐
│  LESSON LIST PAGE                        │
│  /watch/:courseId                        │
│  State: lessons[], course, hasAccess     │
└────────┬───────────────────────────────┘
         │
         │ Click [Play →]
         ↓
┌──────────────────────────────────────────────────────┐
│  VIDEO PLAYER PAGE                                   │
│  /video/:courseId/:lessonId/:videoIndex              │
│  State: lesson, currentVideoIndex, videoError        │
│                                                      │
│  User can:                                           │
│  ├─ Click [← Previous] → videoIndex--               │
│  ├─ Click [Next →] → videoIndex++                   │
│  ├─ Click [← Back to Lessons] → Go back             │
│  └─ Scroll down to see description                  │
└──────────────────────────────────────────────────────┘
```

---

## Responsive Design Grid 📱

```
┌─────────────────────────────────────────────────────┐
│         MOBILE (375px)                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Back to Course                                     │
│  [Course Title]                                     │
│  3 Lessons                                          │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ [1] Lesson                                   │  │
│  │ 🎬 2 Videos              [Play →]            │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │ [2] Lesson                                   │  │
│  │ 🎬 3 Videos              [Play →]            │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │ [3] Lesson                                   │  │
│  │ 🎬 1 Video               [Play →]            │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│         TABLET (768px)                                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Back to Course   Course Title        3 Lessons         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [1] Lesson Title                                 │   │
│  │ Description here... 🎬 2 Videos   [Play →]      │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [2] Lesson Title                                 │   │
│  │ Description here... 🎬 3 Videos   [Play →]      │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [3] Lesson Title                                 │   │
│  │ Description here... 🎬 1 Video    [Play →]      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│         DESKTOP (1920px)                                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Back to Course  │  Course Title                3 Lessons       │
│                  │                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ [1] Lesson Title          Description here...             │  │
│  │ 🎬 2 Videos               [Play →]                        │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ [2] Lesson Title          Description here...             │  │
│  │ 🎬 3 Videos               [Play →]                        │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ [3] Lesson Title          Description here...             │  │
│  │ 🎬 1 Video                [Play →]                        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow 🚨

```
User tries to watch video
│
├─ Check 1: User enrolled? → No
│  └─ Show: "Access Denied" message
│     └─ Link to home page
│
├─ Check 2: Enrollment verified? → No
│  └─ Show: "Awaiting verification" message
│     └─ Wait for admin
│
├─ Check 3: Lesson exists? → No
│  └─ Show: "Lesson not found" message
│     └─ Back button
│
├─ Check 4: YouTube embed? → Fails
│  └─ Show: "Video Unavailable"
│     ├─ Reason: "Video is currently unavailable"
│     ├─ Suggestion: "Try another part or contact support"
│     └─ [← Previous] or [Next →] still work
│        (Can switch to working video)
│
└─ All checks pass? → Video loads!
   └─ User can watch and navigate
```

---

## Summary 📋

```
✅ LessonDetail Component
   - Lists all lessons
   - Route: /watch/:courseId
   - Database: GET lessons WHERE courseId

✅ VideoPlayer Component  
   - Plays single video
   - Route: /video/:courseId/:lessonId/:videoIndex
   - Database: GET lesson WHERE lessonId

✅ App Routes
   - Both routes configured
   - ProtectedRoute applied
   - Error handling included

✅ User Experience
   - Clear lesson list
   - Full-screen video
   - Easy navigation
   - Mobile responsive
   - Error handling

✅ YouTube Integration
   - Embed URL format correct
   - Error handling for failures
   - Multiple videos per lesson
   - Progress tracking
```

---

**All components are properly integrated and ready to use!** 🎉
