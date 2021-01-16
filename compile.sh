cd ../Main_Part
echo "Pulling from GitHub Repo."
git pull origin master
cd ../Markdown_To_Blog
echo "Running Python Script"
python3 blog.py
echo "Python Script Completed"
echo "Pushing into Github Repo"
cd ../Main_Part
git add .
git commit -m "Adding New Blog Post"
git push origin master
echo "Done."
