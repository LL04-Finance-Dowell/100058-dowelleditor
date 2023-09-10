if [ -z "$1" ]; then
    echo "Commit message is missing !."
else 
    git add .
    git commit -m "$1"
    git push 
fi