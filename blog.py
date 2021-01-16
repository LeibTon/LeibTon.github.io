import markdown
import os
import random
import datetime
from shutil import copyfile
from bs4 import BeautifulSoup
MARKDOWN_DIR = "MarkDown"
BLOG_DIR = "Blog"
SITE_BLOG_DIR = "../Main_Part/Blog"

markDowns = os.listdir(MARKDOWN_DIR)
blogs = os.listdir(BLOG_DIR)

html_intial_doc = """
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, intial-scale=1.0" />
  <link rel="stylesheet" href="../css/blog-single.css" />
  <title>{}</title>
<link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Lora:ital@1&display=swap" rel="stylesheet">
 <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet"> 
</head>
<body>
<div class = "blog-single-main">
<div class = "blog-single-nav-part">
<span><a class="blog-single-nav-link" href="https://prakashaditya369.github.io">LeibTon</a><a class="blog-single-nav-link" href="https://prakashaditya369.github.io/about.html">Aditya Prakash</a><a class="blog-single-nav-link" href="https://prakashaditya369.github.io/blog.html">All Blogs</a></span><span>Date: {}</span>
</div>
<div class = "blog-single-sub-main">
<div class = "blog-single-sub-sub-main">
"""
html_end_doc = """
</div>
</div>"""
html_final_doc = """
<div class="blog-single-sub-main">
<div class="blog-single-horizontal"><hr><span style="60px">Other Blogs</span><hr></div>
</div>
<div class = "blog-single-sub-main">
<div class = "blog-single-sub-sub-main blog-single-other-blogs">
<ul>
<li><a class = "blog-single-other-blogs" href="{}">{}</a></li>
<li><a class = "blog-single-other-blogs" href= "{}">{}</a></li>
<li><a class = "blog-single-other-blogs" href = "{}">{}</a></li>
</ul>
</div>
</div>
"""

html_end_game = """</div>
</body>
</html>
"""

def afterMarkdownThing(string, fileName):
	print("New File Detected: ", MARKDOWN_DIR+"/"+fileName+".md")
	soup = BeautifulSoup(string, 'html.parser')
	now = datetime.datetime.now()
	final_string = html_intial_doc.format(soup.h1.string, now.strftime('%B %d, %Y'))+string+html_end_doc;
	if len(markDowns)>=4:
		l1 = []
		final_list = []
		while(len(l1)<3):
			num = random.randint(1,len(markDowns))
			if str(num)!= fileName and num not in l1:
				l1.append(num)
		for i in l1:
			final_list.append(str(i)+".html")
			with open(MARKDOWN_DIR+"/"+str(i)+".md") as file1:
				lines_temp = file1.read();
				soup_temp = BeautifulSoup(markdown.markdown(lines_temp),'html.parser')
				final_list.append(soup_temp.h1.string)
	final_string+=html_final_doc.format(final_list[0],final_list[1],final_list[2],final_list[3],final_list[4],final_list[5])
	final_string+=html_end_game
	with open(BLOG_DIR+"/"+fileName+".html","w") as file_temp:
		print("Saving File:",BLOG_DIR+"/"+fileName+".html")
		file_temp.write(final_string)
	print("Copying file",BLOG_DIR+"/"+fileName+".html","to", SITE_BLOG_DIR+"/"+fileName+".html")
	copyfile(BLOG_DIR+"/"+fileName+".html", SITE_BLOG_DIR+"/"+fileName+".html")


flag = 0
for marktext in markDowns:
	file_name = marktext[:-3]
	if file_name+".html" not in blogs:
		flag = 1
		with open(MARKDOWN_DIR+"/"+marktext) as file:
			lines = file.read()
			markResult = markdown.markdown(lines)
			afterMarkdownThing(markResult,file_name)
if flag==0:
	print("No New File Detected.")

if flag!=0:
	print("Editing blog.html")
	blog_html_first= """
	<!DOCTYPE html>
	<html>

	<head>
	  <meta charset="UTF-8" />
	  <meta name="viewport" content="width=device-width, intial-scale=1.0" />
	<link rel="icon" href="img/favicon.ico" />
	<link rel="stylesheet" href="css/about_navigation.css" />
	<link rel="stylesheet" href="css/navigation.css" />
	  <title>Blogs</title>
	</head>
	<body>
	<!--About Home Navigation Thing-->
	<div class="about_nav">
	<div class = "links">
	<a class="btn-slice" href="/blog.html">
	  <div class="top"><span>Blog</span></div>
		<div class="bottom"><span>Blog</span></div>
	</a>

	<a class="btn-slice" href="/pratibimb.html">
	  <div class="top"><span>Pratibimb</span></div>
		<div class="bottom"><span>Pratibimb</span></div>
	</a>

	<a class="btn-slice" href="/now.html">
	  <div class="top"><span>Now</span></div>
		<div class="bottom"><span>Now</span></div>
	</a>
	</div>
	<div class="about_nav_button">
	<span class = "top"> </span>
	<span class= "middle"></span>
	<span class = "bottom"> </span>
	</div>
	</div>
	<!--About Home Navigation Thing Ends-->
	<div style="display: flex; justify-content: center; margin-top: 50px">
	<div style="max-width: 800px; width: 100%;padding: 30px 30px;">
	<h1 style="text-align: center; margin-bottom: 30px; color: #f1aa9b; font-family: Arial;">All Blogs</h1>
	<ul style="list-style: '-';margin-left: 40px">
	"""

	blog_html_last = """
	</ul>
	</div>
	</div>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TimelineLite.min.js" integrity="sha512-tSIDeirKC6suYILHqqPuZH3s0MvD4a5vCHXhBIcdmq4gQXZ2IB3fEYA5x2f3D2p/CbSqzKEvuTEVbS5VZ2u+ew==" crossorigin="anonymous"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenLite.min.js" integrity="sha512-pvDW4tehKKsohH97164HwKwRGFpzayEFWTVbk8HuUoLIQ7Jp+WLN5XYokVuoCj2aT6dy8ihbW8SRTG1k0W4mSQ==" crossorigin="anonymous"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/plugins/CSSPlugin.min.js" integrity="sha512-ocsFo48WU8Xq6Y1Lwi7psXRAujG9E4TKNR4q1DbrKzaaxOMTEoao/a+mDoB+cYzY4lwbyxvqjkp/ZA1/MNlfsg==" crossorigin="anonymous"></script>
	<script src="js/anime.min.js"></script>
	<script src="js/about_navigation.js"></script>
	<script src="js/navigation.js"></script>

	</body>

	</html>
	"""

	blog_html_list = """
	<li style="padding-left: 20px;"><a href="{}" style="text-decoration: none; font-size: 1.2rem; color: #11698e">{}</a></li>
	"""

	main_blog_files = os.listdir(SITE_BLOG_DIR)
	final_string = blog_html_first
	for files in main_blog_files:
		with open(SITE_BLOG_DIR+"/"+files) as temp:
			lines = temp.read()
			soup = BeautifulSoup(lines, 'html.parser')
			final_string+=blog_html_list.format("Blog/"+files,soup.h1.string)
	final_string+=blog_html_last

	with open("../Main_Part/blog.html","w") as file:
		file.write(final_string)
