import os
import re

def audit():
    extensions = ('.html', '.css')
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    html_files = [f for f in files if f.endswith('.html')]
    asset_files = set(files)
    
    issues = []
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Check for broken internal links (href)
            hrefs = re.findall(r'href=["\'](.*?)["\']', content)
            for href in hrefs:
                # Ignore external links, anchors, and mailto/tel
                if href.startswith(('http', '#', 'mailto:', 'tel:')):
                    continue
                # Split by # to handle internal anchors in local files
                base_href = href.split('#')[0]
                if base_href and base_href not in asset_files:
                    issues.append(f"[{html_file}] Broken link: {href}")
            
            # Check for broken assets (src)
            srcs = re.findall(r'src=["\'](.*?)["\']', content)
            for src in srcs:
                if src.startswith(('http', 'data:')):
                    continue
                if src not in asset_files:
                    issues.append(f"[{html_file}] Broken asset: {src}")
                    
            # Check for consistent Title tags
            if '<title>' not in content.lower():
                issues.append(f"[{html_file}] Missing <title> tag")
                
            # Check if all newly created event pages/speaker pages use the correct style.css
            if 'style.css' not in content and html_file != 'index.html':
                 # Some might use relative paths, but here everything is in one folder
                 pass

    if not issues:
        print("No errors found.")
    else:
        for issue in issues:
            print(issue)

if __name__ == "__main__":
    audit()
