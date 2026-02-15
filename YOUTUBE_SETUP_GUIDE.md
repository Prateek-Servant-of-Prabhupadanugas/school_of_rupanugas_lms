# ⚙️ YouTube Setup Guide for Unlisted Videos

## Why Your Videos Aren't Playing

**Most Common Issue:** YouTube videos set to "Private" instead of "Unlisted"

**The Difference:**
- **Private** → Only you can see it, cannot be embedded
- **Unlisted** → Anyone with link can see it, CAN be embedded ✓
- **Public** → Everyone can see it, CAN be embedded ✓

---

## Step-by-Step: Make Your Videos Unlisted ✅

### Method 1: YouTube Studio (Recommended)

**Step 1: Go to YouTube Studio**
1. Open [YouTube Studio](https://studio.youtube.com)
2. Click "Videos" in left sidebar

**Step 2: Select Your Video**
1. Find the video you want to share
2. Click on it to open details

**Step 3: Change Privacy Setting**
1. Click "Details" tab (if not already open)
2. Scroll down to "Visibility" section
3. Look for these options:
   ```
   ○ Public
   ○ Unlisted ← SELECT THIS
   ○ Private
   ○ Scheduled
   ```
4. Click the **"Unlisted"** radio button
5. Click **"Save"** button

**Step 4: Wait for Changes**
- Video takes 5-10 seconds to update
- Status should show "Video is unlisted"

**Step 5: Get the Video ID**
1. Still in video details, look for the video URL
2. Video URL looks like: `https://youtube.com/watch?v=dQw4w9WgXcQ`
3. The ID is after `v=` → **`dQw4w9WgXcQ`** ← Copy this!

---

## Step-by-Step: Add Video to Database

### Step 1: Get Your Video ID
Your YouTube video URL: `https://youtube.com/watch?v=XXXXXXXXXXXX`

Copy the part after `v=`:
```
Example: dQw4w9WgXcQ
Your ID: _______________
```

### Step 2: Open Your Database (Appwrite)
1. Go to your Appwrite Console
2. Select your project
3. Go to Databases
4. Open the lessons collection

### Step 3: Create/Update Lesson
Create a new lesson or update existing with this structure:

```javascript
{
  // Required fields
  "courseId": "your_course_id_here",
  "title": "Lesson Title Here",
  "order": 1,
  
  // Optional fields
  "description": "Optional lesson description",
  
  // IMPORTANT - Video IDs in ARRAY format
  "youtubeIds": [
    "dQw4w9WgXcQ",   // Part 1
    "jNQXAC9IVRw",   // Part 2 (if you have multiple)
    "pour9LM8LF7U"   // Part 3 (if you have multiple)
  ]
}
```

**⚠️ CRITICAL:** 
- `youtubeIds` must be an **ARRAY** `[]` not a single string!
- Each video ID should be exactly **11 characters**
- Video IDs only, not full URLs!

---

## Test Your Video Setup

### Quick Test (Without App)

1. **Get your video ID:** `dQw4w9WgXcQ`
2. **Create embed URL:** `https://www.youtube.com/embed/dQw4w9WgXcQ`
3. **Open in browser** → Should see video player
4. If video plays → ✅ Setup is correct!
5. If error → ❌ Check privacy setting

### Full App Test

1. Enroll in course (or have admin enroll you)
2. Wait for admin to verify enrollment
3. Go to course page
4. Click "Watch Course"
5. Should see lesson list
6. Click "Play" on a lesson
7. Video should load full-screen

---

## Common Issues & Fixes

### Issue 1: "Video Unavailable" Error

**Cause:** Video is Private, not Unlisted

**Fix:**
1. Go to YouTube Studio
2. Find video
3. Click "Details"
4. Change from Private → Unlisted
5. Save changes
6. Wait 10 seconds
7. Refresh your app

---

### Issue 2: Video ID Is Wrong Format

**Cause:** Used full URL instead of just the ID

**Wrong Examples:**
```javascript
❌ "https://youtube.com/watch?v=dQw4w9WgXcQ"
❌ "youtu.be/dQw4w9WgXcQ"
❌ "watch?v=dQw4w9WgXcQ"
```

**Correct Example:**
```javascript
✅ "dQw4w9WgXcQ"
```

**Fix:**
1. Open YouTube video
2. Get URL: `https://youtube.com/watch?v=dQw4w9WgXcQ`
3. Copy only part after `v=` → `dQw4w9WgXcQ`
4. Update database with correct ID

---

### Issue 3: Videos Won't Load in App

**Possible Causes:**
1. Video is still "Private" → Fix: Change to "Unlisted"
2. Video ID is wrong → Fix: Re-copy the correct ID
3. Database format wrong → Fix: Use array format: `["ID1", "ID2"]`
4. Not enrolled/verified → Fix: Enroll and wait for admin approval
5. Video still processing → Fix: Wait 30 minutes after upload

---

## YouTube Video Privacy Settings Explained

### 🔴 PRIVATE ❌
```
Only visible to: You
Can be embedded: NO
Can others watch: NO
Use case: Personal videos, tests
```

### 🟡 UNLISTED ✅ (USE THIS)
```
Only visible to: People with the link
Can be embedded: YES
Can others watch: YES (if they have link)
Use case: Courses, educational content, shared content
```

### 🟢 PUBLIC ✓
```
Only visible to: Everyone
Can be embedded: YES
Can others watch: YES
Use case: General educational videos, public content
```

---

## Example: Complete Setup

### Your Videos:
```
Video 1: "Sacred Philosophy Part 1"
YouTube URL: https://youtube.com/watch?v=dQw4w9WgXcQ
Privacy: Unlisted ✓

Video 2: "Sacred Philosophy Part 2"
YouTube URL: https://youtube.com/watch?v=jNQXAC9IVRw
Privacy: Unlisted ✓

Video 3: "Sacred Philosophy Part 3"
YouTube URL: https://youtube.com/watch?v=pour9LM8LF7U
Privacy: Unlisted ✓
```

### In Database (Appwrite):
```javascript
{
  "courseId": "philosophy_101",
  "title": "Sacred Philosophy Series",
  "description": "Three-part series on sacred philosophy",
  "order": 1,
  "youtubeIds": [
    "dQw4w9WgXcQ",
    "jNQXAC9IVRw",
    "pour9LM8LF7U"
  ]
}
```

### In Your App:
```
Lesson List:
├─ Sacred Philosophy Series (3 videos) [Play →]

Video Player:
├─ Shows Video 1
├─ "Part 1 of 3"
├─ [← Previous] [Next →]
├─ Click Next → Shows Video 2
├─ Shows "Part 2 of 3"
└─ etc.
```

---

## Video Upload Checklist ✓

Before adding video to your course:

- [ ] Upload video to YouTube
- [ ] Wait for YouTube to process (5-30 minutes)
- [ ] Go to YouTube Studio
- [ ] Find your video in "Videos" list
- [ ] Click on video title to open details
- [ ] Click "Details" tab
- [ ] Find "Visibility" section
- [ ] Select "Unlisted" radio button
- [ ] Click "Save" button
- [ ] See "Video is unlisted" confirmation
- [ ] Copy video ID from URL
- [ ] Go to your database (Appwrite)
- [ ] Add lesson with youtubeIds array
- [ ] Test in your app
- [ ] Video appears and plays ✓

---

## Common Video ID Examples

**Format:** Always 11 characters

```
✅ Correct IDs (11 characters each):
- dQw4w9WgXcQ
- jNQXAC9IVRw
- pour9LM8LF7U
- 9bZkp7q19f0
- D10lFmqbHWc

❌ Incorrect IDs (not 11 chars or wrong format):
- dQw (too short)
- https://youtube.com/watch?v=dQw4w9WgXcQ (full URL)
- youtu.be/dQw4w9WgXcQ (wrong format)
```

---

## Batch Update Your Videos

If you have many videos to fix:

### Using YouTube Studio Bulk Actions (if available):
1. Go to YouTube Studio
2. Select multiple videos
3. Look for "Edit videos" or similar option
4. Change privacy setting for all
5. Apply changes

### Manual Method:
1. Create a list of your video URLs
2. Extract the ID from each
3. Change privacy of each to "Unlisted"
4. Add all IDs to your database

---

## Video Embedding Best Practices

### Do's ✅
- ✅ Use "Unlisted" videos for educational content
- ✅ Extract just the video ID (11 characters)
- ✅ Use array format for multiple videos: `["ID1", "ID2"]`
- ✅ Test embed URL before saving to database
- ✅ Keep videos organized with clear titles

### Don'ts ❌
- ❌ Don't use "Private" videos (won't embed)
- ❌ Don't use full YouTube URLs (use ID only)
- ❌ Don't mix URLs and IDs in same array
- ❌ Don't forget to save after changing privacy
- ❌ Don't embed without testing first

---

## Quick Reference: Privacy Settings

| Setting | Visible To | Embed Works | Use For |
|---------|-----------|-----------|---------|
| Private | You only | ❌ NO | Personal/tests |
| Unlisted | Link holders | ✅ YES | Courses |
| Public | Everyone | ✅ YES | Public education |

---

## Support: What to Check

If videos aren't working, verify in order:

1. **YouTube Privacy**
   - Studio → Video → Details → Visibility
   - Should be: ◉ Unlisted

2. **Video ID**
   - Should be 11 characters: `dQw4w9WgXcQ`
   - Not full URL: `https://youtube.com/watch?v=dQw4w9WgXcQ`

3. **Database Format**
   - Should be array: `["ID1", "ID2"]`
   - Not string: `"ID1, ID2"`

4. **User Enrollment**
   - User must be enrolled in course
   - Enrollment must be verified by admin

5. **Browser Test**
   - Open: `youtube.com/embed/dQw4w9WgXcQ`
   - Should see video player, not error

---

## TL;DR (Quick Version)

**To make your YouTube videos work:**

1. Upload video to YouTube
2. Go to YouTube Studio
3. Click video → Details
4. **Change Visibility from "Private" → "Unlisted"**
5. Save changes
6. Copy the video ID (11 characters after `v=`)
7. Add to database: `youtubeIds: ["YOUR_ID"]`
8. Test in app → Should work! ✓

---

**Status:** ✅ **READY TO SETUP**

Follow these steps and your YouTube videos will embed perfectly!
