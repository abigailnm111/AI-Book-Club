from openai import OpenAI  
import os
from dotenv import load_dotenv
import pymupdf

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def get_summary(text: str) -> str:
    """
    Generate a summary and discussion questions for book text
    
    Args:
        text: The book text to summarize
        
    Returns:
        JSON string with summary and discussion questions
    """
    prompt = (
        "You are a member of my book club.\n"
        "Given the attached book, can you summarize the book in a way that is easy to understand and engaging for a book club discussion?\n"
        "Please use 5 sentences or less.\n"
        "Please also include 3 discussion questions that can be used to spark conversation.\n"
        "Please organize response in json format with the following keys: summary, discussion_questions\n"
        f"Chapter:\n{text[:4000]}"
    )
    
    response = client.chat.completions.create(
        model="gpt-4.1-nano", 
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return response.choices[0].message.content or "No response from AI"

def get_book_text_interactive() -> str:
    """
    Interactive function to get book text from user input
    """
    pdf_path = input("Where is the PDF file you want to analyze? ")
    print(pdf_path)
    
    # Get the directory of the current script file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Go up to project root
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
    # Construct the full path to the PDF file
    full_pdf_path = os.path.join(project_root, pdf_path)
    
    text = ""
    book = pymupdf.open(full_pdf_path)
    for page in book:
        text += page.get_text("text")
    return text

if __name__ == "__main__":
    book = get_book_text_interactive()
    output = get_summary(book)
    print(output) 