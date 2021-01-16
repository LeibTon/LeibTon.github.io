cd ../Main_Part
pwd
echo "Pulling from GitHub Repo."
git pull origin master
cd ../Markdown_To_Blog
pwd
echo "Running Python Script"
python3 blog.py
echo "Python Script Completed"
