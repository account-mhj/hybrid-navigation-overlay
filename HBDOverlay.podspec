require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "HBDOverlay"
  s.version      = package["version"]
  s.summary      = package["description"]
 
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/listenzz/hybrid-navigation-overlay.git", :tag => "#{s.version}" }

  s.source_files = "ios/Overlay/**/*.{h,m,mm}"
  s.dependency "React-Core"
  s.dependency "HybridNavigation"
end
